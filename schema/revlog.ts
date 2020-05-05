import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import Cards from './cards'

@Entity()
export default class Revlog {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number
  // -- epoch-milliseconds timestamp of when you did the review

  @ManyToOne(type => Cards, card => card.revisions)
  @JoinColumn({ name: 'cid' })
  card: Cards

  @Column({ name: 'cid' })
  cardId: number
  // -- cards.id

  @Column({ name: 'usn' })
  updateSequence: number
  // -- update sequence number: for finding diffs when syncing.
  // --   See the description in the cards table for more info

  @Column({ name: 'ease' })
  ease: number
  // -- which button you pushed to score your recall.
  // -- review:  1(wrong), 2(hard), 3(ok), 4(easy)
  // -- learn/relearn:   1(wrong), 2(ok), 3(easy)

  @Column({ name: 'ivl' })
  interval: number
  // -- interval (i.e. as in the card table)

  @Column({ name: 'lastIvl' })
  lastInterval: number
  // -- last interval (i.e. the last value of ivl. Note that this value is not necessarily equal to the actual interval between this review and the preceding review)

  @Column({ name: 'factor' })
  factor: number
  // -- factor

  @Column({ name: 'time' })
  time: number
  // -- how many milliseconds your review took, up to 60000 (60s)

  @Column({ name: 'type' })
  type: number
  // --  0=learn, 1=review, 2=relearn, 3=cram
}
