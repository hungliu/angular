import {
  Directive,
  ElementRef,
  Renderer,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[RowHover]"
})
export class RowHoverDirectiveDirective {
  constructor(private el: ElementRef, private render: Renderer) {}

  defaultColor: string = "white";
  highlightedColor: string = "#faeea7";

  @HostBinding("style.backgroundColor") color: string = this.defaultColor;

  @HostListener("mouseover") onMouseOver() {
    let rowEven = this.el.nativeElement.querySelector(".rowEven");
    if (rowEven != null) {
      this.render.setElementStyle(rowEven, "color", "blue");
      this.render.setElementStyle(rowEven, "font-weight", "Bold");
    }

    let rowOdd = this.el.nativeElement.querySelector(".rowOdd");
    if (rowOdd != null) {
      this.render.setElementStyle(rowOdd, "color", "#e64727");
      this.render.setElementStyle(rowOdd, "font-style", "italic");
    }
    //set hai-lai color for each row
    this.color = this.highlightedColor;
  }
  @HostListener("mouseout") onMouseOut() {
    let rowEven = this.el.nativeElement.querySelector(".rowEven");
    if (rowEven != null) {
      this.render.setElementStyle(rowEven, "color", "black");
      this.render.setElementStyle(rowEven, "font-weight", "normal");
    }

    let rowOdd = this.el.nativeElement.querySelector(".rowOdd");
    if (rowOdd != null) {
      this.render.setElementStyle(rowOdd, "color", "black");
      this.render.setElementStyle(rowOdd, "font-style", "normal");
    }
    //set hai-lai color for each row
    this.color = this.defaultColor;
  }
}
