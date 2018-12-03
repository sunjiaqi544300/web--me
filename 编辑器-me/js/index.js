let deit_f = document.getElementById("deit_f"); //编辑显示
let deit_t = document.getElementById("deit_t"); //预览显示

let color_auto = document.getElementById("color_auto"); //颜色
let color_action = document.getElementById("color_action"); //选中的颜色
let color_list = document.getElementById("color_list"); //预览颜色列表
let findcolor = document.querySelectorAll("#color_list span") //预览颜色列表

let _edit = document.getElementById("edit"); //编辑
let _delete = document.getElementById("delete"); //删除
let _enlarge = document.getElementById("enlarge"); //放大
let _save = document.getElementById("save"); //保存edit_t

let _edit_t = document.getElementById("edit_t"); //编辑文本内容edit_t
let _edit_f = document.getElementById("edit_f"); //非编辑文本内容edit_f

let _selectFamily = document.getElementById("select-family"); //字体
let _selectFonts = document.getElementById("select-fonts"); //字号

let _CB = document.getElementById("CB"); //加粗
let _CU = document.getElementById("CU"); //下划线
let _CI = document.getElementById("CI"); //切斜

window.onload = function() {
	findcolor.forEach(function(dom, index) {
		dom.onclick = function(e) {
			e.stopPropagation();
			document.execCommand("foreColor", false, this.style.backgroundColor);
			// console.log(this.style.background)
			color_action.style.background = this.style.background;
			color_list.style.display = "none";
		}
	})
}
	//加粗B    Bold
	_CB.onclick = function() {
		setFocus();
		let _ClassName = this.className;
		// console.log(_ClassName)
		if (_ClassName.indexOf("act") != -1) {
			this.className=this.className.replace(/\bact\b/," ")
			document.execCommand("Bold", false, null);
		} else {
			this.className = "act"
			document.execCommand("Bold", false, "normal");
		}
	}
	//下划线U    Underline 
	_CU.onclick = function() {
		setFocus();
		let _ClassName = this.className;
		console.log(_ClassName)
		if (_ClassName.indexOf("act") != -1) {
			this.className=this.className.replace(/\bact\b/," ")
			document.execCommand("Underline", false, null);
		} else {
			this.className = "act";
			document.execCommand("Underline", false, "normal");
		}
	}
	// 	//倾斜I     Italic 
	_CI.onclick = function() {
		setFocus();
		let _ClassName = this.className;
		if (_ClassName.indexOf("act") != -1) {
			this.className=this.className.replace(/\bact\b/," ")
			document.execCommand("Italic", false, null);
		} else {
			this.className = "act"
			document.execCommand("Italic", false, "normal");
		}
	}
	//选择颜色
	color_auto.onclick = function() {
		color_list.style.display = "block"
	}
	//字体
	_selectFamily.onchange = function() {
		console.log(this.value)
		document.execCommand("FontName", false, this.value);
	}
	_selectFamily.onmouseup=function(e){
	    e.stopPropagation()
	}
	//字号
	_selectFonts.onchange = function() {
		console.log(this.value)
		document.execCommand("FontSize", false, this.value + "px");
	}
	_selectFonts.onmouseup=function(e){
		e.stopPropagation()
	}
	//编辑操作
	_edit.onclick = function() {
		deit_f.style.display = "none"
		deit_t.style.display = "block"
		_edit_t.innerHTML = _edit_f.innerHTML
	}
	//保存操作
	_save.onclick = function() {
		deit_f.style.display = "block"
		deit_t.style.display = "none"
		_edit_f.innerHTML = _edit_t.innerHTML
	}
document.onmouseup = function() {
	if(deit_f.style.display!="none") return;
	
	//选中文本的时候，取消其他文本的选中状态
	_CB.classList.remove("act");
	_CU.classList.remove("act");
	_CI.classList.remove("act");
	_selectFamily.value=_selectFamily[0].value;
	_selectFonts.value=_selectFonts[0].value;
	
	var selObj = window.getSelection();
	var range  = selObj.getRangeAt(0);
	var commonContainer=range.commonAncestorContainer
	commonContainer=commonContainer.nodeType=="1"?commonContainer:commonContainer.parentNode;//包含选区的最深的节点
	var parent=commonContainer
	while(isChildOf(parent,_edit_t)){
		if(parent.nodeType==1){
			if(parent.nodeName=="B"){
				_CB.classList.add("act")
			}else if(parent.nodeName=="I"){
				_CI.classList.add("act")
			}else if(parent.nodeName=="U"){
				_CU.classList.add("act")
			}else{
				if(parent.face)
					_selectFamily.value=parent.face
				if(parent.size)
					_selectFonts.value=parent.size
			}
			parent=parent.parentNode
		}
	}
}

//判断是否包含子节点
function isChildOf(child, parent){
	var parentNode;
	if(child && parent){
		parentNode = child.parentNode
		// console.log(parentNode)
		// console.log(parent)
		while(parentNode) {
			if(parentNode === parent) {
				return true
			}
			parentNode = parentNode.parentNode
		}
	}
	return false
}

//设置光标的位置
function setFocus(){
	console.log("ada")
	var selObj = window.getSelection();
	var range = selObj.getRangeAt(0);
	var commonContainer = range.commonAncestorContainer;
	// console.log(commonContainer.parentNode)
	if(isChildOf(commonContainer, _edit_t)){
		_edit_t.focus()
	}else{
		_edit_t.focus();
		range.collapse(false);
		range.setStart(commonContainer,commonContainer.length);
	}
}





