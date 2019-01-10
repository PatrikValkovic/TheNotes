export class Note {

  static* createFromDatabase(arrayOfNotes): IterableIterator<Note> {
    for (const note of arrayOfNotes) {
      const {heading, content, tags} = note;
      yield new Note(heading, content, tags);
    }
  }

  constructor(public heading: string,
              public content: string,
              public tags: Array<string>) {
  }

  toObject() {
    return {
      heading: this.heading,
      content: this.content,
      tags: this.tags
    };
  }
}
