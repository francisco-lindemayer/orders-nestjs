import { ApiModelProperty } from '@nestjs/swagger';
import { Customer } from '../customer.entity';

export class UpdateCustomerDto {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 'Fulano' })
  name: string;

  @ApiModelProperty({ example: 'fulano@umemail.com' })
  email: string;
}
