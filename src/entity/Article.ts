import {
  BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { Archive } from "./Archive";
import { Topic } from "./Topic";

@Entity()
export class Article extends BaseEntity {

  public static findOneWithDetails(id) {
    const select: any = ["title", "body", "createdAt", "updatedAt", "topic"];
    const relations: any = ["topic"];

    return this.findOne(id, {
      loadRelationIds: true,
      relations,
      select,
    });
  }

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public title: string;

  @Column("text", { select: false })
  public body: string;

  @ManyToOne((type) => Topic, (topic) => topic.articles)
  public topic: Topic;

  @OneToMany((type) => Archive, (archive) => archive.article)
  public archives: Archive[];

  @CreateDateColumn({ name: "createdAt", precision: 3 })
  public readonly createdAt?: Date;

  @UpdateDateColumn({ name: "updatedAt", precision: 3 })
  public readonly updatedAt?: Date;
}
