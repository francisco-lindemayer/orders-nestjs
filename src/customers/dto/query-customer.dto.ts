import { ApiModelProperty } from '@nestjs/swagger';
import { QueryPageDto } from 'src/commons/query-page.dto';

export class QueryCustomerDto extends QueryPageDto {
  @ApiModelProperty({ example: 'Fulano', required: false })
  name: string;

  @ApiModelProperty({ example: '11111111111', required: false })
  cpf: string;

  @ApiModelProperty({ example: 'fulano@umemail.com', required: false })
  email: string;
}
