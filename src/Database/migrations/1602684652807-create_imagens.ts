import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagens1602684652807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'imagens',
            columns:[
              {
                name: "id",
                type: "integer",
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
              },
              {
                name: 'id_orphanat',
                type: 'integer'
              },
              {
                name: 'patch',
                type: 'varchar'
              }
            ],
            foreignKeys:[
                {
                    name: 'ImageOrphanatos',
                    columnNames: ['id_orphanat'],
                    referencedTableName: 'orphanats',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imagens');
    }

}
