<script lang="js">
import { USlideover } from '#components';

/* Extend USlideover so as to emit a signal when the slider is opened */
export default defineComponent({
    emits: ['open', 'update:modelValue'],
    extends: USlideover,
    props: ['modelValue'],
    setup(props, { emit, slots }) {
        const { modelValue } = toRefs(props);

        // watch the v-model value
        watch(modelValue, (_new, _) => {
            // only emit an event when this value is true
            if (_new) nextTick(() => emit('open'));
        });

        /* render the component with original props */
        return () => h(USlideover, {
            ...props,
            // map the v-model signal of this component to the v-model signal of the parent component
            'onUpdate:modelValue': (value) => emit('update:modelValue', value)
        }, {
            // map the slots. Only use when the component has slots implemented.
            default: () => slots.default()
        });
    }
});
</script>