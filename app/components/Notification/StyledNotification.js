import styled from 'styled-components';
import { Popover } from 'antd';
export const NotificationWrapper = styled.div`
  .anticon-bell {
    font-size: 18px;
    padding-right: 10px;
    @media screen and (max-width: 500px) {
      padding-right: 10px;
    }
  }
  .ant-badge {
    font-size: 18px;
    padding-right: 20px;
  }
  .ant-badge-count {
    right: 20px;
  }
`;
export const StyledPopOver = styled(Popover)``;
