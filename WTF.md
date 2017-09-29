# WTF1:使用angular -material 时要引入主题样式。
更改.angular-cli.json修改styles配置，如果用
deeppurple-amber.css就报错。其他css可以，把deeppurple-amber.css防到其他目录引入不能可以
"styles": [
  "../node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
  "styles.scss"
],

# WTF2:angular2-markdown代码import HttpModule会引起http factory provider不起作用，mock就挂了

修改angular2-markdown代码，删除import HttpModules

# WTF3：material.js select的flaoting-label 会挡住选择的值

bootstrap-material material.js要修改以下部分，解决select后floating-label还在的问题
.on("blur", ".form-control, .form-group.is-fileinput", function () {
    var $input = $(this);
  if ($input.is('select.form-control') ||
    $input.is('input.form-control')) {
      var $formGroup = $input.closest(".form-group");
      if ($input.val() === "") {
        $formGroup.addClass("is-empty");
      }
      else {
        $formGroup.removeClass("is-empty");
      }
    }
    _removeFormGroupFocus(this);
})

# WTF4: 增加select2 支持 修改material.js
"inputElements": "input.form-control, textarea.form-control, select.form-control, select2.form-control",
.on("blur", ".form-control, .form-group.is-fileinput", function () {
  var $input = $(this);
  var no_val=false;
  var $formGroup = $input.closest(".form-group");
  if ($input.is('select.form-control') ||
    $input.is('input.form-control')) {
    no_val = ($input.val() === "");
  }
  else if( $input.is('select2.form-control')){
    no_val = ($input.children('select').val().length === 0);
  }
  if(no_val)
  {
    $formGroup.addClass("is-empty");
  }
  else {
    $formGroup.removeClass("is-empty");
  }
    _removeFormGroupFocus(this);
})

# WTF5:ng2-select2默认宽度问题

ng2-select2 bug太多，已经内置到app TopCommon中了

修改ng2-select2-component.js 把width默认由resolve改成100%
var options = {
    data: this.data,
    width: (this.width) ? this.width : '100%'
};



