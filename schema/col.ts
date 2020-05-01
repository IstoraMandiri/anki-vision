import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Col {
  @PrimaryGeneratedColumn()
  id: number

  // -- arbitrary number since there is only one row
  @Column()
  crt: number
  // -- timestamp of the creation date. It's correct up to the day. For V1 scheduler, the hour corresponds to starting a new day. By default, new day is 4.

  @Column()
  mod: number
  // -- last modified in milliseconds

  @Column()
  scm: number
  // -- schema mod time: time when "schema" was modified.
  // --   If server scm is different from the client scm a full-sync is required

  @Column()
  ver: number
  // -- version

  @Column()
  dty: number
  // -- dirty: unused, set to 0

  @Column()
  usn: number
  // -- update sequence number: used for finding diffs when syncing.
  // --   See usn in cards table for more details.

  @Column()
  ls: number
  // -- "last sync time"

  @Column('simple-json')
  conf: string
  // -- json object containing configuration options that are synced

  @Column('simple-json')
  models: string
  // -- json array of json objects containing the models (aka Note types)

  @Column('simple-json')
  decks: string
  // -- json array of json objects containing the deck

  @Column('simple-json')
  dconf: string
  // -- json array of json objects containing the deck options

  @Column('simple-json')
  tags: string
  // -- a cache of tags used in the collection (This list is displayed in the browser. Potentially at other place)
}
