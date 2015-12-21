function MenuItem (styleClass, doeHetMethod, enabledMethod) {
	this.styleClass = styleClass;
    this.doeHetMethod = doeHetMethod;
	this.enabledMethod = enabledMethod;
}

MenuItem.prototype.isMenuItemDisabled = function() {
	return this.enabledMethod != null && !this.enabledMethod();
};

MenuItem.prototype.styleClasses = function() {
	var result = 'fa ' + this.styleClass + ' menuitem';
	if (this.isMenuItemDisabled()) {
		result += 'disabledMenuitem';
	}
	return result;
};

MenuItem.prototype.doeHet = function() {
	if (this.isMenuItemDisabled()) {
		return;
	}
	this.doeHetMethod();
};

function MenuItemGroup (menuItemLeft, menuItemRight) {
	this.menuItemLeft = menuItemLeft;
    this.menuItemRight = menuItemRight;
}
