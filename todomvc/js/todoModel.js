var app = app || {};

(function () {
  'use strict';

  var Utils = app.Utils;

  app.TodoModel = function (key) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChanges = [];
  };

  app.TodoModel.prototype.subscribe = function (onChange) {
    this.onChanges.push(onChange);
  };

  app.TodoModel.prototype.inform = function () {
    Utils.store(this.key, this.todos);
    this.onChange.forEach(function (cb) {
      cb();
    });
  };

  /**
   * 添加一条记录
   */
  app.TodoModel.prototype.addTodo = function (title) {
    this.todos = this.todos.concat({
      id: Utils.uuid();
      title: title,
      completed: false
    });

    this.inform();
  };

  /**
   * 改变所有的状态
   */
  app.TodoModel.prototype.toggleAll = function (checked) {
    this.todos = this.todos.map(function (todo) {
      return Utils.extend({}, todo, {completed: checked});
    });
  };

  /**
   * 选中的那条状态改变
   */
  app.TodoModel.prototype.toggle = function (todoToToggle) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToToggle ? todo : Utils.extend({}, todo, {completed: !todo.completed});
    });
  };

  // 删除选择的那条记录
  app.TodoModel.prototype.destroy = function (todo) {
    this.todos = this.todos.filter(function (candidate) {
      return candidate !== todo;
    });
    this.inform();
  };

  // 修改标题时候保存记录
  app.TodoModel.prototype.save = function (todoToSave, text) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
    });
  };

  // 清除没完成的任务
  app.TodoModel.prototype.clearCompleted = function () {
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });
    this.inform();
  };
} ());
