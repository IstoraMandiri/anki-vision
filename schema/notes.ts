import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Notes {
  @PrimaryGeneratedColumn()
  id: number
  // -- epoch miliseconds of when the note was created

  @Column()
  guid: string
  // -- globally unique id, almost certainly used for syncing

  @Column()
  mid: number
  // -- model id

  @Column()
  mod: number
  // -- modification timestamp, epoch seconds

  @Column()
  usn: number
  // -- update sequence number: for finding diffs when syncing.
  // --   See the description in the cards table for more info

  @Column()
  tags: string
  // -- space-separated string of tags.
  // --   includes space at the beginning and end, for LIKE "% tag %" queries

  @Column()
  flds: string
  // -- the values of the fields in this note. separated by 0x1f (31) character.

  @Column()
  sfld: string
  // -- sort field: used for quick sorting and duplicate check

  @Column()
  csum: number
  // -- field checksum used for duplicate check.
  // --   integer representation of first 8 digits of sha1 hash of the first field

  @Column()
  flags: number
  // -- unused

  @Column()
  data: string
  // -- unused
}
