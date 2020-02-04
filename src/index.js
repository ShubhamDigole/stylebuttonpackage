import StyledButtonsTesting from "./StyledButtonsTesting.vue";

// Install BootstrapVue


export default {
    install(Vue, options) {
        Vue.component("styled-testing-button", StyledButtonsTesting);
        Vue.directive('click-outside', {
            bind: function (el, binding, vNode) {
                const handler = (e) => {
                    if (!el.contains(e.target) && el !== e.target) {
                        //and here is you toggle var. thats it
                        console.log('outside')
                        vNode.context[binding.expression] = false
                    }
                }
                el.out = handler
                document.addEventListener('click', handler)
            },
        
            unbind: function (el, binding) {
                document.removeEventListener('click', el.out)
                el.out = null
            }
        })
    }
}