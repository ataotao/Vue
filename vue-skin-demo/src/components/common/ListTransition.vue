<script>
import Velocity from 'velocity-animate';
export default {
    functional: true,
    render: function (createElement, context) {
        var data = {
            props: {
                name: 'listTransition',
                mode: 'out-in',
                tag: 'ul'
            },
            on: {
                beforeEnter: function (el) {
                    el.style.opacity = 0;
                    el.style.height = 0;
                },
                enter: function (el, done) {
                    // var delay = el.dataset.index * 150;
                    setTimeout(()=> {
                        Velocity(
                            el,
                            { opacity: 1, height: '0.4rem' },
                            { complete: done }
                        );
                    }, 100);
                },
                leave: function (el, done) {
                    // var delay = el.dataset.index * 150;
                    setTimeout(()=> {
                        Velocity(
                            el,
                            { opacity: 0, height: 0 },
                            { complete: done }
                        );
                    }, 100);
                },
            }
        };
        return createElement('transition-group', data, context.children);
    }
};
</script>