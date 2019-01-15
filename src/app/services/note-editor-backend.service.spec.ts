import {TestBed} from '@angular/core/testing';

import {NoteEditorBackendService} from './note-editor-backend.service';

describe('NoteEditorBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteEditorBackendService = TestBed.get(NoteEditorBackendService);
    expect(service).toBeTruthy();
  });
});
