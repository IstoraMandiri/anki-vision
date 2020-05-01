import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Cards {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nid: number
  // -- notes.id

  @Column()
  did: number
  // -- deck id

  @Column()
  ord: number
  // -- identifies which of the card templates or cloze deletions it corresponds

  @Column()
  mod: number
  // -- modificaton time as epoch seconds

  @Column()
  usn: number
  // -- update sequence number : used to figure out diffs when syncing

  @Column()
  type: number
  // --  0=new, 1=learning, 2=due, 3=relearning

  @Column()
  queue: number
  // -- -3=user buried(In scheduler 2),
  // -- -2=sched buried (In scheduler 2),
  // -- -2=buried(In scheduler 1),
  // -- -1=suspended,
  // -- 0=new, 1=learning, 2=due (as for type)
  // -- 3=in learning, next rev in at least a day after the previous review

  @Column()
  due: number
  // -- Due is used differently for different card types:
  // --   new: note id or random int
  // --   due: integer day, relative to the collection's creation time
  // --   learning: integer timestamp

  @Column()
  ivl: number
  // -- interval (used in SRS algorithm). Negative = seconds, positive = days

  @Column()
  factor: number
  // -- The ease factor of the card in permille (parts per thousand). If the ease factor is 2500, the card’s interval will be multiplied by 2.5 the next time you press Good.

  @Column()
  reps: number
  // -- number of reviews

  @Column()
  lapses: number
  // -- the number of times the card went from a "was answered correctly"
  // --   to "was answered incorrectly" state

  @Column()
  left: number
  // -- of the form a*1000+b, with:
  // -- b the number of reps left till graduation
  // -- a the number of reps left today

  @Column()
  odue: number
  // -- original due: In filtered decks, it's the original due date that the card had before moving to filtered.
  // -- If the card lapsed in scheduler1, then it's the value before the lapse. (This is used when switching to scheduler 2. At this time, cards in learning becomes due again, with their previous due date)
  // -- In any other case it's 0.

  @Column()
  odid: number
  // -- original did: only used when the card is currently in filtered deck

  @Column()
  flags: number
  // -- an integer. This integer mod 8 represents a "flag", which can be see in browser and while reviewing a note. Red 1, Orange 2, Green 3, Blue 4, no flag: 0. This integer divided by 8 represents currently nothing

  @Column()
  data: string
  // -- currently unused
}
