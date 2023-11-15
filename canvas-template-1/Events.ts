//events
window.addEventListener('load', () => {
    setup();
    animate();
});

window.addEventListener('resize', () => {
    setup();
});

window.addEventListener('mousemove', (evt) => {
    _mouseX = evt.x;
    _mouseY = evt.y;
});

window.addEventListener('touchmove', (evt) => {
    //
});
