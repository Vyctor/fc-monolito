import { Model, Column, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  purchasePrice: number;

  @Column({ allowNull: true })
  salesPrice: number;

  @Column({ allowNull: false })
  inventory: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
