document.addEventListener('DOMContentLoaded', (event) => {
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        let isDragging = false;

        draggable.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent default action

            isDragging = true;
            const originalWidth = draggable.offsetWidth;
            const originalHeight = draggable.offsetHeight;

            let shiftX = e.clientX - draggable.getBoundingClientRect().left;
            let shiftY = e.clientY - draggable.getBoundingClientRect().top;
            // let originalX = draggable.offsetLeft;
            // let originalY = draggable.offsetTop;

            draggable.style.position = 'absolute';
            draggable.style.zIndex = 1000;
            draggable.style.width = `${originalWidth}px`;
            draggable.style.height = `${originalHeight}px`;

            function moveAt(pageX, pageY) {
                let newX = pageX - shiftX - window.scrollX;
                let newY = pageY - shiftY - window.scrollY;
            
                draggable.style.left = newX + 'px';
                draggable.style.top = newY + 'px';
            }
            

            moveAt(e.pageX, e.pageY);

            function onMouseMove(event) {
                if (isDragging) {
                    moveAt(event.pageX, event.pageY);
                }
            }

            document.addEventListener('mousemove', onMouseMove);

            draggable.onmouseup = function() {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                draggable.onmouseup = null;
            };

            // Ensure dragging stops if the cursor leaves the draggable element
            draggable.addEventListener('mouseleave', () => {
                isDragging = false;
            });

            // Also ensure dragging stops if the mouse is released anywhere on the document
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    document.removeEventListener('mousemove', onMouseMove);
                }
            }, { once: true }); // Use {once: true} to automatically remove this event listener after it fires once
        });

        draggable.ondragstart = () => false; // Disable default drag start behavior
    });
});
