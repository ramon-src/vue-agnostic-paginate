import { shallow } from 'vue-test-utils';
import Pagination from '@/Pagination';

describe('Pagination', () => {
  let pagination;

  beforeEach(() => {
    pagination = shallow(Pagination, {
      propsData: {
        path: 'http://localhost:8080/api/lista',
      },
    });
  });

  it('should receive path and param name page', () => {
    expect(pagination.vm.path).toEqual('http://localhost:8080/api/lista');
  });

  it('should starts with pagelabel as page', () => {
    expect(pagination.vm.pagelabel).toEqual('page');
  });

  it('should starts in page 1', () => {
    expect(pagination.vm.startsIn).toEqual(1);
  });

  it('should starts getting list items and emitting', () => {
    const paginationWithItems = shallow(Pagination, {
      propsData: {
        path: 'http://localhost:8080/api/lista',
      },
      methods: {
        fetchData() {
          this.$data.items = [{ name: 'John Doe' }];
          this.$emit('items', this.items);
        },
      },
    });
    expect(paginationWithItems.emitted().items[0]).toEqual([[{ name: 'John Doe' }]]);
  });

  it('should emit data when page button clicked', () => {
    pagination.find('.pagination__page-button').trigger('click');
    expect(pagination.emitted().items[1]).toEqual([[]]);
  });
});
