import format from './format';
import encodeHtml from './encodeHtml';
import './fillCharacter.css';

function bindVueFunc(el, binding, vnode) {
	let value = vnode.text; //vnode.data.attrs.value;
	if (vnode.data && vnode.data.domProps && vnode.data.domProps.innerHTML) {
		value = vnode.data.domProps.innerHTML;
	}
	if (vnode.children && vnode.children.length === 1) {
		value = vnode.children[0].text.replace(/^\s(.*)\s$/, '$1');
	}
	let returnValue = format(binding.value, value);
	el.innerHTML = encodeHtml(returnValue);
}

export default {
	install(app) {
		const func = (value, code) => {
			return format(code, value).join('');
		};
		app.directive('format', { bind: bindVueFunc, update: bindVueFunc });
		if (app.version >= '3') app.config.globalProperties.textFormat = func;
		else app.prototype.textFormat = func;
	}
};
