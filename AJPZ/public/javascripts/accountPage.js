var vueinst = new Vue({
    el: '#webpage',
    data: {
        top_menu: [
            { title:'User Info', url:'/userinfo' },
            { title:'Check-In', url:'/about' },
            { title:'Hotspot Map', url:'/hotspotmap' },
            { title:'Check-In History', url:'/history' }
        ]
    }
});