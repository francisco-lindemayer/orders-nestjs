import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiModelProperty({ example: 'Fulano' })
  name: string;

  @ApiModelProperty({ example: '11111111111' })
  cpf: string;

  @ApiModelProperty({ example: 'fulano@umemail.com' })
  email: string;
}
