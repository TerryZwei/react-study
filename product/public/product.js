(function () {
  var FilterableProductTable = React.createClass({
    render: function () {
      var newProducts = {};
      var lastCategory = null;
      this.props.data.forEach(function (product) {
        newProducts[product.category] = newProducts[product.category] || [];
        newProducts[product.category].push(product);
      });
      return (
        <div>
          <SearchBar />
          <ProductTable data={newProducts}/>
        </div>
      );
    }
  });

  var SearchBar = React.createClass({
    render: function () {
      return (
        <div>
          <input type="text" placeholder="Search..." /><br/>
          <input type="checkbox" /> Only show products in stock
        </div>
      );
    }
  });

  var ProductTable = React.createClass({
    render: function () {
      var products = this.props.data;
      var productsRow = [];
      for (var key in products) {
        productsRow.push(<ProductCategoryRow category={key} key={key}/>);
        for (var i = 0; i < products[key].length; i++) {
          productsRow.push(<ProductRow data={products[key][i]} key={products[key][i].name}/>);
        }
      }
      return (
        <div>
          <div><span>Name</span><span>  Price</span></div>
          {productsRow}
        </div>
      );
    }
  });

  var ProductCategoryRow = React.createClass({
    render: function () {
      return (
        <p>{this.props.category}</p>
      );
    }
  });

  var ProductRow = React.createClass({
    render: function () {
      return (
        <p><span>{this.props.data.name}</span><span>  {this.props.data.price}</span></p>
      );
    }
  });
  var data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
  ReactDOM.render(
    <FilterableProductTable data={data}/>,
    document.getElementById('content')
  );
} ());
