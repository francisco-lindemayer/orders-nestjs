import { ApiModelProperty } from '@nestjs/swagger';
import { Customer } from '../customer.entity';

export class CustomerDto {
  constructor(customer: Customer) {
    Object.assign(this, customer.get({ clone: true }));
  }

  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 'Fulano' })
  name: string;

  @ApiModelProperty({ example: '11111111111' })
  cpf: string;

  @ApiModelProperty({ example: 'fulano@umemail.com' })
  email: string;
}
