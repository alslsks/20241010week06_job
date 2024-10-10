let Product = function (name, price, stock) {  
    this.name = name;  
    this.price = price;  
    this.stock = stock;  
    this.addStock = function(quantity) {  
      this.stock += quantity;  
    }  
    this.show = function(){  
      console.log(`${this.name}, ${this.price}元, ${this.stock}件`);  
    }  
  }  
    
  let SellingMachine = function () {  
    this.products = [  
      new Product('水', 2, 10),  
      new Product('可乐', 3, 10),  
      new Product('牛奶', 5, 10),  
    ];  
      
    this.list = function() {  
      let productList = '销售以下商品：\n';  
      this.products.forEach(m => {  
        productList += `${m.name}, ${m.price}元, ${m.stock}件\n`;  
      });  
      alert(productList);  
    }  
      
    this.replenishment = function(){  
      let name = prompt('请输入要补货的商品名称：');  
      let quantity = parseInt(prompt('请输入补货数量：'));  
        
      if (isNaN(quantity) || quantity <= 0) {  
        alert('数量必须是一个大于0的整数');  
        return;  
      }  
        
      const product = this.products.find(x => x.name === name);  
      if (!product) {  
        alert(`不销售${name}`);  
        return;  
      }  
        
      product.addStock(quantity);  
      alert(`补货成功，${product.name}剩余${product.stock}件`);  
    }  
      
    this.sell = function(){  
      let name = prompt('请输入要购买的商品名称：');  
      let quantity = parseInt(prompt('请输入购买数量：'));  
      let money = parseFloat(prompt('请输入支付金额：'));  
        
      if (isNaN(quantity) || quantity <= 0 || isNaN(money) || money < 0) {  
        alert('数量和金额必须是有效的数字，并且数量必须大于0');  
        return;  
      }  
        
      const product = this.products.find(x => x.name === name);  
      if (!product) {  
        alert(`不销售${name}`);  
        return;  
      }  
        
      if (product.stock < quantity) {  
        alert(`库存不足，${product.name} 仅剩 ${product.stock} 件`);  
        return;  
      }  
        
      const totalPrice = quantity * product.price;  
      if (money < totalPrice) {  
        alert(`金额不足，${name} ${quantity}件应付￥${totalPrice}`);  
        return;  
      }  
        
      product.addStock(-quantity);  
      const rest = money - totalPrice;  
      alert(`成功购买商品：${name}, ${quantity}件, 共${totalPrice}元，请取走您的商品。${rest > 0 ? `以及零钱${rest}元。` : ''}`);  
    }  
  }  
    
  const machine = new SellingMachine();  
  machine.list(); // 显示商品列表  
    
  // 以下是交互部分  
  machine.sell(); // 销售商品  
  machine.replenishment(); // 补货  
  machine.list(); // 再次显示商品列表以确认补货结果  
    
  // 为了演示，我们可以再次进行销售操作  
  machine.sell(); // 再次销售商品  
  machine.list(); // 最后显示商品列表以确认库存情况