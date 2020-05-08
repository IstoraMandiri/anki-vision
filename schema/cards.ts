import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import Revlog from "./revlog";
import Notes from "./notes";

@Entity({ name: "cards" })
export default class Cards {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne((type) => Notes)
  @JoinColumn({ name: "nid" })
  note: Notes;

  @Column({ name: "nid" })
  noteId: number;
  // -- notes.id

  @Column({ name: "did" })
  deckId: number;
  // -- deck id

  @Column({ name: "ord" })
  ordinal: number;
  // -- identifies which of the card templates or cloze deletions it corresponds

  @Column({ name: "mod" })
  modified: number;
  // -- modificaton time as epoch seconds

  @Column({ name: "usn" })
  updateSequence: number;
  // -- update sequence number : used to figure out diffs when syncing

  @Column({ name: "type" })
  type: number;
  // --  0=new, 1=learning, 2=due, 3=relearning

  @Column({ name: "queue" })
  queue: number;
  // -- -3=user buried(In scheduler 2),
  // -- -2=sched buried (In scheduler 2),
  // -- -2=buried(In scheduler 1),
  // -- -1=suspended,
  // -- 0=new, 1=learning, 2=due (as for type)
  // -- 3=in learning, next rev in at least a day after the previous review

  @Column({ name: "due" })
  due: number;
  // -- Due is used differently for different card types:
  // --   new: note id or random int
  // --   due: integer day, relative to the collection's creation time
  // --   learning: integer timestamp

  @Column({ name: "ivl" })
  interval: number;
  // -- interval (used in SRS algorithm). Negative = seconds, positive = days

  @Column({ name: "factor" })
  factor: number;
  // -- The ease factor of the card in permille (parts per thousand). If the ease factor is 2500, the card’s interval will be multiplied by 2.5 the next time you press Good.

  @Column({ name: "reps" })
  reps: number;
  // -- number of reviews

  @Column({ name: "lapses" })
  lapses: number;
  // -- the number of times the card went from a "was answered correctly"
  // --   to "was answered incorrectly" state

  @Column({ name: "left" })
  repsLeft: number;
  // -- of the form a*1000+b, with:
  // -- b the number of reps left till graduation
  // -- a the number of reps left today

  @Column({ name: "odue" })
  originalDueDate: number;
  // -- original due: In filtered decks, it's the original due date that the card had before moving to filtered.
  // -- If the card lapsed in scheduler1, then it's the value before the lapse. (This is used when switching to scheduler 2. At this time, cards in learning becomes due again, with their previous due date)
  // -- In any other case it's 0.

  @Column({ name: "odid" })
  originalDeckId: number;
  // -- original did: only used when the card is currently in filtered deck

  @Column({ name: "flags" })
  flags: number;
  // -- an integer. This integer mod 8 represents a "flag", which can be see in browser and while reviewing a note. Red 1, Orange 2, Green 3, Blue 4, no flag: 0. This integer divided by 8 represents currently nothing

  @Column({ name: "data" })
  data: string;
  // -- currently unused

  @OneToMany((type) => Revlog, (revlog) => revlog.card)
  revisions: Revlog[];
}
