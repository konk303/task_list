import { ChangeEvent } from 'react';
import { List } from '../__generated__/graphql';
import ListContainer from './ListContainer';

export default function Lists ({
  lists,
  list,
  changeHandler
}: {
  lists: List[],
  list: List,
  changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div>
      <select value={ list.id } onChange={ changeHandler }>
        { lists.map(({ id, name }) => <option key={ id } value={ id }>{ name }</option>) }
      </select>
      <ListContainer list={ list } key={ list.id } />
    </div>
  );
}
