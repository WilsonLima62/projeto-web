import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPontosHistoricos1611946473719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'pontos',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, //NÚMEROS POSITIVO
                    isPrimary: true, // PRIMARRY KEY
                    isGenerated: true, // GERADA AUTOMATICAMENTE
                    generationStrategy: 'increment' //AUTOINCREMENT
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'opening_hours',
                    type: 'varchar',
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,
                },
            ],

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pontosHistoricos')
    }

}
