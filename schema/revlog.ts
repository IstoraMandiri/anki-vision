import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Revlog {
  @PrimaryGeneratedColumn()
  id: number
  // -- epoch-milliseconds timestamp of when you did the review

  @Column()
  cid: number
  // -- cards.id

  @Column()
  usn: number
  // -- update sequence number: for finding diffs when syncing.
  // --   See the description in the cards table for more info

  @Column()
  ease: number
  // -- which button you pushed to score your recall.
  // -- review:  1(wrong), 2(hard), 3(ok), 4(easy)
  // -- learn/relearn:   1(wrong), 2(ok), 3(easy)

  @Column()
  ivl: number
  // -- interval (i.e. as in the card table)

  @Column()
  lastIvl: number
  // -- last interval (i.e. the last value of ivl. Note that this value is not necessarily equal to the actual interval between this review and the preceding review)

  @Column()
  factor: number
  // -- factor

  @Column()
  time: number
  // -- how many milliseconds your review took, up to 60000 (60s)

  @Column()
  type: number
  // --  0=learn, 1=review, 2=relearn, 3=cram
}
