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

  it('should starts with current page 1', () => {
    expect(pagination.vm.currentPage).toEqual(1);
  });

  it('should decrease the page number 3 to 2 when click in prev button', () => {
    pagination.setData({
      currentPage: 3,
      totalPages: 3
    })
    pagination.find('.pagination__prev-page-btn').trigger('click')
    expect(pagination.find('.pagination__current-page').text()).toBe('2')
  });

  it('should increase the page number 1 to 2 when click in next button', () => {
    pagination.setData({
      currentPage: 1,
      totalPages: 3
    })
    pagination.find('.pagination__next-page-btn').trigger('click')
    expect(pagination.find('.pagination__current-page').text()).toBe('2')
  });

  it('should not decrease the page number 1 when click prev button in the first page', () => {
    pagination.setData({
      currentPage: 1,
      totalPages: 1
    })
    pagination.find('.pagination__next-page-btn').trigger('click')
    expect(pagination.find('.pagination__current-page').text()).toBe('1')
  });

  it('should not increase the page number 3 when click next button in the last page', () => {
    pagination.setData({
      currentPage: 3,
      totalPages: 3
    })
    pagination.find('.pagination__next-page-btn').trigger('click')
    expect(pagination.find('.pagination__current-page').text()).toBe('3')
  });

  it('should starts getting list items and emitting', () => {
    const paginationWithItems = shallow(Pagination, {
      propsData: {
        path: 'http://localhost:8080/api/lista',
      },
      methods: {
        fetchData() {
          this.$emit('items', [{ name: 'John Doe' }]);
        },
      },
    });
    expect(paginationWithItems.emitted().items[0]).toEqual([[{ name: 'John Doe' }]]);
  });

  it('should emit data when page button clicked', () => {
    pagination.find('.pagination__prev-page-btn').trigger('click');
    expect(pagination.emitted().items[1]).toEqual([[]]);
  });
});
