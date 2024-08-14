interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  requiresConfirmation: boolean;
}

class Note implements INote {
  static idCounter = 1;

  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  requiresConfirmation: boolean;

  constructor(title: string, content: string, requiresConfirmation: boolean = false) {
    if (!title.trim() || !content.trim()) {
      throw new Error('Title and content cannot be empty.');
    }
    this.id = Note.idCounter++;
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isCompleted = false;
    this.requiresConfirmation = requiresConfirmation;
  }

  update(title: string, content: string) {
    if (!title.trim() || !content.trim()) {
      throw new Error('Title and content cannot be empty.');
    }
    if (this.requiresConfirmation && !confirm('Are you sure you want to update this note?')) {
      return;
    }
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }
}

class TodoList {
  private notes: Note[];

  constructor() {
    this.notes = [];
  }

  addNote(title: string, content: string, requiresConfirmation: boolean = false): void {
    const note = new Note(title, content, requiresConfirmation);
    this.notes.push(note);
  }

  deleteNote(id: number): boolean {
    const index = this.notes.findIndex(note => note.id === id);
    if (index === -1) {
      return false;
    }
    this.notes.splice(index, 1);
    return true;
  }

  editNote(id: number, title: string, content: string): boolean {
    const note = this.notes.find(note => note.id === id);
    if (!note) {
      return false;
    }
    note.update(title, content);
    return true;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  getAllNotes(): Note[] {
    return [...this.notes];
  }

  getCompletedNotes(): number {
    return this.notes.filter(note => note.isCompleted).length;
  }

  getIncompleteNotes(): number {
    return this.notes.filter(note => !note.isCompleted).length;
  }

  toggleNoteCompletion(id: number): boolean {
    const note = this.notes.find(note => note.id === id);
    if (!note) {
      return false;
    }
    note.toggleCompletion();
    return true;
  }

  searchNotes(query: string): Note[] {
    const lowerCaseQuery = query.toLowerCase();
    return this.notes.filter(note =>
      note.title.toLowerCase().includes(lowerCaseQuery) ||
      note.content.toLowerCase().includes(lowerCaseQuery)
    );
  }

  sortNotesByCreationTime(): Note[] {
    return [...this.notes].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  sortNotesByStatus(): Note[] {
    return [...this.notes].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
  }
}