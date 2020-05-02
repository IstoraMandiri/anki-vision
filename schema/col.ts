import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Col {
  @PrimaryGeneratedColumn()
  id: number

  // -- arbitrary number since there is only one row
  @Column({ name: 'crt' })
  created: number
  // -- timestamp of the creation date. It's correct up to the day. For V1 scheduler, the hour corresponds to starting a new day. By default, new day is 4.

  @Column({ name: 'mod' })
  modified: number
  // -- last modified in milliseconds

  @Column({ name: 'scm' })
  schemaModified: number
  // -- schema mod time: time when "schema" was modified.
  // --   If server scm is different from the client scm a full-sync is required

  @Column({ name: 'ver' })
  version: number
  // -- version

  @Column({ name: 'dty' })
  dirty: number
  // -- dirty: unused, set to 0

  @Column({ name: 'usn' })
  updateSequenceNumber: number
  // -- update sequence number: used for finding diffs when syncing.
  // --   See usn in cards table for more details.

  @Column({ name: 'ls' })
  lastSynced: number
  // -- "last sync time"

  @Column({ type: 'simple-json', name: 'conf' })
  config: string
  // -- json object containing configuration options that are synced

  @Column({ type: 'simple-json', name: 'models' })
  noteTypes: {
    [key: number]: {
      id: number,
      name: string,
    }
  }
  // -- json array of json objects containing the models (aka Note types)

  @Column({ type: 'simple-json', name: 'decks' })
  decks: {
    [key: number]: {
      id: number,
      name: string,
    }
  }
  // -- json array of json objects containing the deck

  @Column({ type: 'simple-json', name: 'dconf' })
  deckConfig: string
  // -- json array of json objects containing the deck options

  @Column({ type: 'simple-json', name: 'tags' })
  tags: { [tag: string]: number }
  // -- a cache of tags used in the collection (This list is displayed in the browser. Potentially at other place)
}
