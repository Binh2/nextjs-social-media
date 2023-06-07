import renderer from 'react-test-renderer';
import { ProfileImage } from '@/components/ProfileImage';

it('renders correctly', () => {
  const tree = renderer
    .create(<ProfileImage></ProfileImage>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});