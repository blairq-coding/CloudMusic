<template>
    <SearchTop />
</template>

<script>
import SearchTop from '@/components/SearchTop.vue'
import { useStore } from 'vuex'
import { onBeforeMount, onMounted } from 'vue';
export default {
    components: {
        SearchTop
    },
    setup() {
        const store = useStore();
        onBeforeMount(()=>{
            store.commit('setPlayFlag', {playControlFlag: true, navBarFlag: false})
        });
        onMounted(()=>{
            mui.back = function() {
            window.history.go(-1);
        }
        })
    }
}
</script>