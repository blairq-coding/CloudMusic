<template>
    <div id="bottom">
        <playCtl :tracks="playlist" v-show="playControlFlag" /> 

        <BottomNav class="bottom-bar" v-show="navBarFlag" />
    </div>
</template>
<script>
import playCtl from '@/views/playCtl.vue'
import { mapState } from 'vuex';
import BottomNav from '@/components/BottomNav.vue'
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        mui.back = function() {
            window.history.go(-1);
        }
    },
    computed: {
        ...mapState(['playControlFlag', 'navBarFlag', 'playlist'])
    },
    components: {
        playCtl,
        BottomNav
    }
}
</script>
<style lang="less" scoped>
#bottom {
    width: 7.5rem;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    // background-color: #efefef;
}
</style>
