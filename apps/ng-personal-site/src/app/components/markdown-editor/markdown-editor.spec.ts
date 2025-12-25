import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownEditor } from './markdown-editor';
import { MarkdownModule } from 'ngx-markdown';

describe('MarkdownEditor', () => {
  let component: MarkdownEditor;
  let fixture: ComponentFixture<MarkdownEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownEditor, MarkdownModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MarkdownEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty content', () => {
    expect(component.content()).toBe('');
  });

  it('should initialize in edit mode', () => {
    expect(component.isPreview()).toBe(false);
  });

  describe('togglePreview', () => {
    it('should toggle between edit and preview mode', () => {
      expect(component.isPreview()).toBe(false);

      component.togglePreview();
      expect(component.isPreview()).toBe(true);

      component.togglePreview();
      expect(component.isPreview()).toBe(false);
    });
  });

  describe('markdown formatting', () => {
    let textarea: HTMLTextAreaElement;

    beforeEach(() => {
      // Wait for ViewChild to initialize
      fixture.detectChanges();
      textarea = component['textareaRef'].nativeElement;
      textarea.value = '';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 0;
      component.content.set('');
    });

    it('should insert bold markdown', () => {
      component.onBold();
      expect(component.content()).toBe('****');
    });

    it('should wrap selected text in bold', () => {
      textarea.value = 'selected text';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 13;
      component.content.set(textarea.value);

      component.onBold();
      expect(component.content()).toBe('**selected text**');
    });

    it('should insert italic markdown', () => {
      component.onItalic();
      expect(component.content()).toBe('__');
    });

    it('should wrap selected text in italic', () => {
      textarea.value = 'italic text';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 11;
      component.content.set(textarea.value);

      component.onItalic();
      expect(component.content()).toBe('_italic text_');
    });

    it('should insert strikethrough markdown', () => {
      component.onStrikethrough();
      expect(component.content()).toBe('~~~~');
    });

    it('should wrap selected text in strikethrough', () => {
      textarea.value = 'strike text';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 11;
      component.content.set(textarea.value);

      component.onStrikethrough();
      expect(component.content()).toBe('~~strike text~~');
    });

    it('should insert inline code markdown', () => {
      component.onCode();
      expect(component.content()).toBe('``');
    });

    it('should wrap selected text in code', () => {
      textarea.value = 'const foo = bar';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 15;
      component.content.set(textarea.value);

      component.onCode();
      expect(component.content()).toBe('`const foo = bar`');
    });

    it('should insert code block markdown', () => {
      component.onCodeBlock();
      expect(component.content()).toContain('```');
    });

    it('should wrap selected text in code block', () => {
      textarea.value = 'function test() {}';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 18;
      component.content.set(textarea.value);

      component.onCodeBlock();
      expect(component.content()).toContain('```');
      expect(component.content()).toContain('function test() {}');
    });

    it('should insert heading level 1', () => {
      component.onHeading(1);
      expect(component.content()).toBe('# Heading');
    });

    it('should insert heading level 2', () => {
      component.onHeading(2);
      expect(component.content()).toBe('## Heading');
    });

    it('should insert heading level 3', () => {
      component.onHeading(3);
      expect(component.content()).toBe('### Heading');
    });

    it('should convert line to heading', () => {
      textarea.value = 'My Title';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 8;
      component.content.set(textarea.value);

      component.onHeading(2);
      expect(component.content()).toContain('##');
      expect(component.content()).toContain('My Title');
    });

    it('should insert quote', () => {
      component.onQuote();
      expect(component.content()).toBe('> Quote');
    });

    it('should convert line to quote', () => {
      textarea.value = 'This is a quote';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 15;
      component.content.set(textarea.value);

      component.onQuote();
      expect(component.content()).toContain('>');
      expect(component.content()).toContain('This is a quote');
    });

    it('should insert unordered list', () => {
      component.onUnorderedList();
      expect(component.content()).toBe('- List item');
    });

    it('should insert ordered list', () => {
      component.onOrderedList();
      expect(component.content()).toBe('1. List item');
    });

    it('should insert link markdown', () => {
      component.onLink();
      expect(component.content()).toBe('[](url)');
    });

    it('should wrap selected text as link', () => {
      textarea.value = 'Click here';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 10;
      component.content.set(textarea.value);

      component.onLink();
      expect(component.content()).toBe('[Click here](url)');
    });

    it('should insert image markdown', () => {
      component.onImage();
      expect(component.content()).toBe('![alt text]()');
    });

    it('should wrap selected text as image alt', () => {
      textarea.value = 'My Image';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 8;
      component.content.set(textarea.value);

      component.onImage();
      expect(component.content()).toBe('![alt text](My Image)');
    });

    it('should insert table markdown', () => {
      component.onTable();
      expect(component.content()).toContain('| Header 1 |');
      expect(component.content()).toContain('|----------|');
      expect(component.content()).toContain('| Cell 1   |');
    });

    it('should insert horizontal rule', () => {
      component.onHorizontalRule();
      expect(component.content()).toContain('---');
    });

    it('should insert task list', () => {
      component.onTaskList();
      expect(component.content()).toBe('- [ ] Task item');
    });

    it('should convert line to task list', () => {
      textarea.value = 'Buy groceries';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 13;
      component.content.set(textarea.value);

      component.onTaskList();
      expect(component.content()).toContain('- [ ]');
      expect(component.content()).toContain('Buy groceries');
    });
  });

  describe('line-based formatting', () => {
    let textarea: HTMLTextAreaElement;

    beforeEach(() => {
      fixture.detectChanges();
      textarea = component['textareaRef'].nativeElement;
    });

    it('should add prefix to multiple lines', () => {
      textarea.value = 'Line 1\nLine 2\nLine 3';
      textarea.selectionStart = 0;
      textarea.selectionEnd = textarea.value.length;
      component.content.set(textarea.value);

      component.onUnorderedList();
      const lines = component.content().split('\n');
      expect(lines[0]).toBe('- Line 1');
      expect(lines[1]).toBe('- Line 2');
      expect(lines[2]).toBe('- Line 3');
    });

    it('should remove prefix when toggling off', () => {
      textarea.value = '- Line 1\n- Line 2';
      textarea.selectionStart = 0;
      textarea.selectionEnd = textarea.value.length;
      component.content.set(textarea.value);

      component.onUnorderedList();
      expect(component.content()).toBe('Line 1\nLine 2');
    });

    it('should toggle heading prefix', () => {
      textarea.value = '## My Heading';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 13;
      component.content.set(textarea.value);

      component.onHeading(2);
      expect(component.content()).toBe('My Heading');
    });

    it('should handle ordered list with multiple items', () => {
      textarea.value = 'First\nSecond\nThird';
      textarea.selectionStart = 0;
      textarea.selectionEnd = textarea.value.length;
      component.content.set(textarea.value);

      component.onOrderedList();
      const lines = component.content().split('\n');
      expect(lines[0]).toBe('1. First');
      expect(lines[1]).toBe('1. Second');
      expect(lines[2]).toBe('1. Third');
    });

    it('should toggle quote prefix', () => {
      textarea.value = '> This is quoted';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 16;
      component.content.set(textarea.value);

      component.onQuote();
      expect(component.content()).toBe('This is quoted');
    });
  });

  describe('content binding', () => {
    it('should update content via model', () => {
      const testContent = '# Test Heading\n\nTest content';
      component.content.set(testContent);
      expect(component.content()).toBe(testContent);
    });

    it('should support two-way binding', () => {
      const initialContent = '# Hello World';
      component.content.set(initialContent);
      expect(component.content()).toBe(initialContent);

      const newContent = '## Updated Content';
      component.content.set(newContent);
      expect(component.content()).toBe(newContent);
    });
  });

  describe('ViewChild textarea access', () => {
    it('should access textarea via ViewChild', () => {
      fixture.detectChanges();
      const textarea = component['textareaRef'].nativeElement;
      expect(textarea).toBeTruthy();
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('should handle null textarea gracefully', () => {
      // Before ViewChild initializes
      const newComponent = new MarkdownEditor();
      expect(() => newComponent.onBold()).not.toThrow();
      expect(newComponent.content()).toBe('');
    });
  });

  describe('cursor position management', () => {
    let textarea: HTMLTextAreaElement;

    beforeEach(() => {
      fixture.detectChanges();
      textarea = component['textareaRef'].nativeElement;
      component.content.set('');
    });

    it('should maintain cursor position after insertion', (done) => {
      textarea.value = '';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 0;

      component.onBold();

      setTimeout(() => {
        // Cursor should be between the ** markers
        expect(textarea.selectionStart).toBe(2);
        expect(textarea.selectionEnd).toBe(2);
        done();
      }, 10);
    });

    it('should position cursor after wrapped text', (done) => {
      textarea.value = 'test';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 4;
      component.content.set(textarea.value);

      component.onBold();

      setTimeout(() => {
        // Cursor should be after **test**
        expect(component.content()).toBe('**test**');
        expect(textarea.selectionStart).toBe(8);
        done();
      }, 10);
    });
  });
});
