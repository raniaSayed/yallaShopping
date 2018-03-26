// Load html in Angular 2
// In content.html use:
// <div [innerHTML]="post.content.rendered | safeHtml " class="entry-body"></div>
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitization: DomSanitizer) {
    }
	transform(html) {
		return this.sanitization.bypassSecurityTrustStyle(html)['changingThisBreaksApplicationSecurity']
	}
}