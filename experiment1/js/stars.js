let MaxBrightness = 4;

class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.isHovered = false;
    this.popup = null; // To hold the popup element
  }

  draw() {
    fill(this.color);         
    noStroke();               
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  checkMouseHover() {
    // If mouse is over star, highlight it
    if (dist(mouseX, mouseY, this.x, this.y) < this.radius) {
        fill(255, 255, 0); // Highlight color
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        this.isHovered = true;
    }
    else {
        //If the mouse is not over the star, and the star has a popup, check if mouse is over the popup
        if (this.popup) {
            const popupEl = this.popup.elt;
            const canvas = document.querySelector("canvas");
            const rect = canvas.getBoundingClientRect();
            // Get mouse position on the page
            const pageMouseX = mouseX + rect.left;
            const pageMouseY = mouseY + rect.top;

            // Check if the mouse is within the popup element
            const withinPopup =
                pageMouseX > popupEl.offsetLeft &&
                pageMouseX < popupEl.offsetLeft + popupEl.offsetWidth &&
                pageMouseY > popupEl.offsetTop &&
                pageMouseY < popupEl.offsetTop + popupEl.offsetHeight;

            this.isHovered = withinPopup;
        } else {
            this.isHovered = false;
         }
    }
  }

  createPopup(parentCanvas) {
    if (this.isHovered) {
        // Get canvas position on the page
        const rect = parentCanvas.getBoundingClientRect();
        
        // Adjust for canvas offset
        const pageX = mouseX + rect.left;
        const pageY = mouseY + rect.top;

        // Grab star colors
        const r = red(this.color);
        const g = green(this.color);
        const b = blue(this.color);
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

        this.popup = createDiv(`
            Star at (${this.x.toFixed(2)}, ${this.y.toFixed(2)})<br>
            Brightness:
            <input type="range" min="1" max="100" value=50 class="slider" id="starBrightness"><br>
            Hue:
            <input type="color" id="starColor" value="${hex}"><br>
            `);

        //Brightness Slider
        const slider = this.popup.elt.querySelector('#starBrightness');
        slider.addEventListener('input', (event) => {
            const value = event.target.value;
            this.radius = (value / 100) * MaxBrightness; // Scale radius based on slider value
            this.draw(); // Redraw the star with the new radius
        });

        // Color Picker
        const colorPicker = this.popup.elt.querySelector('#starColor');
        colorPicker.addEventListener('input', (event) => {
            const value = event.target.value;
            this.color = color(value); // Update star color
            this.draw(); // Redraw the star with the new color
        });

        // Set popup styles
        this.popup.position(pageX+2, pageY-2);
        this.popup.style('background-color', 'rgba(168, 168, 168, 0.8)');
        this.popup.style('padding', '5px');
        this.popup.style('border-radius', '5px');
        this.popup.style('box-shadow', '0 2px 4px rgba(0,0,0,0.2)');
    }
  }

  removePopup() {
      if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
  }
}
