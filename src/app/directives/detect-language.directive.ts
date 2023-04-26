// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[appDetectLanguage]'
// })
// export class DetectLanguageDirective {

//   constructor() { }

// }
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDetectLanguage]'
})
export class DetectLanguageDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    
    this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
      const value = this.el.nativeElement.value;
      const isEnglish = /^[a-zA-Z\s]*$/.test(value); // يرجى تغيير الصياغة العامة للاختبار الذي يتطابق مع اللغات التي يجب اختبارها في مشروعك.
      if (!isEnglish) {
        this.renderer.setStyle(this.el.nativeElement, 'direction', 'ltr');
        this.renderer.setProperty(this.el.nativeElement, 'selectionStart', 0);
        this.renderer.setProperty(this.el.nativeElement, 'selectionEnd', 0);
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'direction', 'rtl');
        this.renderer.setProperty(this.el.nativeElement, 'selectionStart', value.length);
        this.renderer.setProperty(this.el.nativeElement, 'selectionEnd', value.length);
      }
    });
  }
}
