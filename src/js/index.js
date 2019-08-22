// import $ from "jquery";
// import SVG from "svg";

$(document).ready(function () {
    var drawer = new DrawerJs.Drawer(null, {
        texts: customLocalization,
        plugins: drawerPlugins,
        defaultImageUrl: '/images/drawer.jpg',
        defaultActivePlugin: { name: 'Pencil', mode: 'lastUsed' },
    }, 600, 600);
    $('#canvas-editor').append(drawer.getHtml());
    drawer.onInsert();
});