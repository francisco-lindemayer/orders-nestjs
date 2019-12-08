import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Op } from 'sequelize';

export class QueryPageDto {
  @ApiModelProperty({ example: 20, default: 20, required: false })
  @Type(() => Number)
  limit: number = 20;

  @ApiModelProperty({ example: 0, default: 0, required: false })
  @Type(() => Number)
  offset: number = 0;

  @ApiModelProperty({ example: 'columnn', required: false })
  orderby: string;

  @ApiModelProperty({ enum: ['ASC', 'DESC'], required: false })
  order: 'ASC' | 'DESC' = 'ASC';

  //Remover campos que não devem ser pesquisados
  getFieldsToSearch(): any {
    const fieldsToSearch = { ...this };

    delete fieldsToSearch.limit;
    delete fieldsToSearch.offset;
    delete fieldsToSearch.order;
    delete fieldsToSearch.orderby;

    return fieldsToSearch;
  }

  //Tratar campos que devem ser utilizados como filtro
  getFieldsToLike(): any {
    const fieldsToSearch = this.getFieldsToSearch();
    const fieldsToLike: any = {};

    Object.keys(fieldsToSearch).forEach(attributeName => {
      const value = fieldsToSearch[attributeName];

      if (typeof value == 'string') {
        fieldsToLike[attributeName] = { [Op.like]: `%${value}%` };
      } else {
        fieldsToLike[attributeName] = value;
      }
    });

    return fieldsToLike;
  }
}
