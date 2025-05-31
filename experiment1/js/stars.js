class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.isHovered = false;
  }

  draw() {
    fill(this.color);         
    noStroke();               
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  checkMouseHover() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.radius) {
        fill(255, 255, 0); // Highlight color
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        this.isHovered = true;
    }
    else {
        this.isHovered = false;
    }
  }
}
