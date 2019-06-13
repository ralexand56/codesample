import React, { SFC } from 'react';
import TagControl from 'src/modules/common/ui/TagControl';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { TagView } from 'src/types';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  tags: TagView[];
  confirmDeleteText: string;
  onClick?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// const Item = posed.li({
//   enter: { opacity: 1 },
//   exit: { opacity: 0 }
// });

// const StyledItem = styled(Item)`
//   padding: 10px;
//   margin: 10px;
//   border: 1px solid;
//   opacity: 0;
// `;

// const sidebarConfig = {
//   enter: { x: '0%' },
//   exit: { x: '-100%' },
//   initialPose: 'exit'
// };

const TagContainer: SFC<Props> = ({
  className,
  confirmDeleteText,
  tags,
  onClick,
  onDelete,
}) => (
  <ul className={className}>
    {tags.map((x, i) => (
      <TagControl
        confirmDeleteText={confirmDeleteText}
        onDelete={onDelete}
        delay={i * 0.08}
        tag={x}
        key={i}
        onClick={onClick}
      />
    ))}
  </ul>
);

const StyledTagContainer = styled(TagContainer)`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  padding: 0px;
  margin: 0px 3px;
`;

export default StyledTagContainer;
