import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Cards from "./cards";

@Entity()
export default class Notes {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;
  // -- epoch miliseconds of when the note was created

  @Column({ name: "guid" })
  guid: string;
  // -- globally unique id, almost certainly used for syncing

  @Column({ name: "mid" })
  modelId: number;
  // -- model id

  @Column({ name: "mod" })
  modified: number;
  // -- modification timestamp, epoch seconds

  @Column({ name: "usn" })
  updateSequence: number;
  // -- update sequence number: for finding diffs when syncing.
  // --   See the description in the cards table for more info

  @Column({ name: "tags" })
  tags: string;
  // -- space-separated string of tags.
  // --   includes space at the beginning and end, for LIKE "% tag %" queries

  @Column({ name: "flds" })
  fields: string;
  // -- the values of the fields in this note. separated by 0x1f (31) character.

  @Column({ name: "sfld" })
  sortField: string;
  // -- sort field: used for quick sorting and duplicate check

  @Column({ name: "csum" })
  checksum: number;
  // -- field checksum used for duplicate check.
  // --   integer representation of first 8 digits of sha1 hash of the first field

  @Column({ name: "flags" })
  flags: number;
  // -- unused

  @Column({ name: "data" })
  data: string;
  // -- unused

  @OneToMany((type) => Cards, (cards) => cards.noteId)
  revisions: Cards[];
}
