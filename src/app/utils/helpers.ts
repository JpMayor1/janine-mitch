export const print = () => {
    var content = document.getElementById("divcontents");
    var el = document.getElementById("ifmcontentstoprint") as any;
    var el2 = el.contentWindow;
    el2.document.open();
    el2.document.write(content?.innerHTML);
    el2.document.close();
    el2.focus();
    el2.print();
}
