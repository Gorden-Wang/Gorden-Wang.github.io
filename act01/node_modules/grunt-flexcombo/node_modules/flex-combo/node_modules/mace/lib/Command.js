var EventEmitter = require('events').EventEmitter;
var util = require('./util.js');
var logue = require('./logue.js');
var debug = logue.debug('mace:Command');
var _reParams = /^\<([a-z0-9\-]+)\>|\[([a-z\-]+)\]$/i;
var _reOption = /^\s*-([a-z])\s*\,\s*--(no-)*([a-z]+)\s*([a-z\<\>\[\]]+)*$/i;
var _reCommand = /^\s*([a-z]+)\s*([a-z\<\>\[\]]+)*$/i;
var _reAllSpaces = /\s+/g;
function Option (flags, desc, dftVal, valid) {
  flags = flags.replace(_reAllSpaces,' ').match(_reOption);
  if (!flags) {
    logue.error([
        'Option\'s flags example:'
      , '\t-p, --port <port>'
      , '\t-L, --no-log'
      , '\t-P, --path <path>'
      , ''
    ].join('\n\r'));
    return process.exit(0);
  }
  this.flags = flags.shift();
  this.short = flags.shift();
  this.prefix = flags.shift() || '';
  this.param = this.long = util.camelCase(this.prefix + flags.shift());
  this.isRequired = false;
  var argv = flags.shift();
  // 是否为非
  this.isBoolean = !!this.prefix || !argv;
  if (argv && (argv = argv.match(_reParams))) {
    this.param = argv[1] || argv[2];
    this.isRequired = !!argv[1];
  }
  this.desc = desc || '';
  this.value = this.isBoolean ? !!dftVal : dftVal;
  this._valid = valid || function (val) {
    if (this.isRequired) {
      return val !== "null" && val !== "undefined" && val != null;
    }
    return true;
  };
}

util.inherits(Option, {
  val: function (val) {
    var valid = this._valid(val);
    if (!valid) {
      return "Invalid"
    }
    if (null == val) {
      return this.value;
    }
    if (this.isBoolean) {
      return !~['false', '0', 'null', 'undefined', 'NaN', 'Infinity'].indexOf(val);
    }
    return val;
  }
});
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
function Command (flags, desc, version) {
  // 
  var res = flags.replace(_reAllSpaces,' ').match(_reCommand);
  if (!res) {
    logue.error([
        'Command example:'
      , '\tinit [which]'
      , ''
    ].join('\r\n'));
    return process.exit(0);
  }
  this.flags = res.shift() || flags;
  this.param = this.name = res.shift();
  var argv = res.shift();
  if (argv && (argv = argv.match(_reParams))) {
    this.param = argv[1] || argv[2];
    this.isRequired = !!argv[1];
    this.isOptional = !!argv[2];
  }
  this.subCmds = {};
  this.desc = desc || '';
  this.options = {};
  this.version = version || '0.0.0';
}
util.inherits(Command, {
  outputHelps: function (cmd, opts) {
    var output = process.stdout;
    if (cmd._helpmsg) {
      output.write(cmd._helpmsg);
      return this;
    }
    var outmsg = [
        'Usage: ' + cmd.name + ' help info',
        'version: ' + cmd.version
      ];

    opts = {};
    util.each(cmd.options, function (opt) {
      opts[opt.short] = opt;
    });
    
    outmsg.push('');
    outmsg.push('Options:');
    var optmsgs = [];
    var _maxLen = 0;
    util.each(opts, function (opt) {
      var flags = opt.flags;
      if (flags.length > _maxLen) {_maxLen = flags.length}
    });
    util.each(opts, function (opt) {
      outmsg.push('  ' + opt.flags + new Array(_maxLen - opt.flags.length + 1).join(' ') + '  ' + opt.desc);
    });
    outmsg.push('');
    
    if (Object.keys(cmd.subCmds).length) {
      outmsg.push('');
      outmsg.push('Command: ');
      _maxLen = 0;
      util.each(cmd.subCmds, function (cmd) {
        var flags = cmd.flags;
        if (flags.length > _maxLen) {
          _maxLen = flags.length;
        }
      });
      util.each(cmd.subCmds, function (cmd) {
        outmsg.push('  ' + cmd.flags + new Array(_maxLen - cmd.flags.length + 1).join(' ') + '  ' + cmd.desc);
      });
      outmsg.push('');
    }
    output.write(cmd._helpmsg = outmsg.join(' \r\n'));
    return this;
  },
  help: function (cmd) {
    return this.outputHelps(this.subCmds[cmd || ''] || this);
  },
  action: function (fn) {
    var self = this;
    var cmd = self;
    var opts = self.options;
    if (!fn.$inject) {
      fn.$inject = [];
      var fnText = fn.toString().replace(STRIP_COMMENTS, '');
      fnText.match(FN_ARGS)[1].split(FN_ARG_SPLIT).forEach(function(arg) {
        arg.replace(FN_ARG, function(all, underscore, name) {
          fn.$inject.push(name);
        });
      });
    }
    while(cmd.parent) {
      cmd = cmd.parent;
    }
    // 没有绑定help
    if (!opts.h || !opts.help) {
      self.option('-h, --help [cmd]', 'Help info', null, function (cmd) {
        // 
        self.help(cmd);
        process.exit(0);
      });
    }
    opts = util.merge(true, {}, opts, cmd.options);
    cmd.on(self.name, function (argv) {
      var params = {};
      var key = self.param || 'args';
      var args = [];
      var arg;
      var opt;
      while(argv.length) {
        arg = argv.shift();
        if (arg && arg[0] !== '-') {
          args.push(arg);
          if (argv.length) {
            continue;
          }
        }
        if (key[1] !== '-') {
          key = key.slice(1).split('');
          while(key.length) {
            opt = opts[key.shift()];
            if (!opt) {
              continue;
            }
            params[opt.param] = opt.val.apply(opt, args);
          }
        } else {
          key = util.camelCase(key.slice(2));
          opt = opts[key];
          if (opt) {
            params[key] = opt.val.apply(opt, args);
          }
        }
        key = arg;
        args = [];
      }
      args = [];
      if (fn.$inject.length) {
        util.each(fn.$inject, function (name) {
          var val = params[name];
          if (null == val) {
            var opt= opts[name];
            if (opt) {
              val = opt.value;
            }
          }
          args.push(val);
        });
        args.push(params);
        fn.apply(cmd, args);
      } else {
        fn.call(cmd, params);
      }
    });
    return cmd;
  },
  option: function (flags, desc, dftVal, valid) {
    var opt = new Option(flags, desc, dftVal, valid);
    var opts = this.options;
    opts[opt.short] = opts[opt.long] = opts[opt.param] = opt;
    return this;
  },
  _hasCommand: function (cmd) {
    return EventEmitter.listenerCount(this, cmd) > 0;
  },
  parse: function (argv) {
    if (typeof argv === 'string') {
      argv = argv.split(/ +/);
    }
    if (!Array.isArray(argv)) {
      logue.error('Can\'t parse an %s Object', argv);
      return process.exit(0);
    }
    var self = this;
    var opts = self.options;
    self._bin = argv.shift();
    self._file = argv.shift();
    var cmd = self.name;
    if (!~(argv[0] || '-').indexOf('-') && this._hasCommand(argv[0])) {
      cmd = argv.shift();
    }
    return this.emit(cmd, this.rawArgv = argv);
  }
}, EventEmitter);

exports.Command = function (flags, desc, dftVal) {
  var command = new Command(flags, desc, dftVal);
  command.command = function (flags, desc, dftVal) {
    var cmd = new Command(flags, desc, dftVal);
    cmd.parent = command;
    command.subCmds[cmd.name] = cmd;
    return cmd;
  };
  return command;
};
