import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  isNew: boolean;
  image: string;
  sku: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'MANNOL 5W-40 Синтетическое моторное масло',
    category: 'Моторные масла',
    price: 2850,
    stock: 145,
    rating: 4.8,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
    sku: 'MN-5W40-4L'
  },
  {
    id: 2,
    name: 'MANNOL 10W-40 Полусинтетическое',
    category: 'Моторные масла',
    price: 1950,
    stock: 89,
    rating: 4.6,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400',
    sku: 'MN-10W40-4L'
  },
  {
    id: 3,
    name: 'MANNOL ATF AG52 Трансмиссионное масло',
    category: 'Трансмиссионные масла',
    price: 3200,
    stock: 54,
    rating: 4.9,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    sku: 'MN-ATF-4L'
  },
  {
    id: 4,
    name: 'MANNOL 80W-90 GL-5 Трансмиссионное',
    category: 'Трансмиссионные масла',
    price: 1750,
    stock: 120,
    rating: 4.5,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1599974875861-c6c496b0e3bb?w=400',
    sku: 'MN-80W90-4L'
  },
  {
    id: 5,
    name: 'MANNOL 0W-30 Premium Синтетика',
    category: 'Моторные масла',
    price: 3850,
    stock: 67,
    rating: 5.0,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=400',
    sku: 'MN-0W30-4L'
  },
  {
    id: 6,
    name: 'MANNOL Антифриз G11 Зелёный',
    category: 'Охлаждающие жидкости',
    price: 850,
    stock: 200,
    rating: 4.7,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
    sku: 'MN-AF-G11-5L'
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const minOrderAmount = 10000;

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedProducts = mockProducts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">MANNOL</h1>
                <p className="text-xs text-muted-foreground">Личный кабинет партнёра</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Icon name="Package" size={16} />
              <span className="hidden sm:inline">Каталог</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2 relative">
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden sm:inline">Корзина</span>
              {cartCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="promo" className="flex items-center gap-2">
              <Icon name="Megaphone" size={16} />
              <span className="hidden sm:inline">Реклама</span>
            </TabsTrigger>
            <TabsTrigger value="forum" className="flex items-center gap-2">
              <Icon name="MessageSquare" size={16} />
              <span className="hidden sm:inline">Форум</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию, категории или артикулу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Icon name="SlidersHorizontal" size={18} />
                Фильтры
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardHeader className="p-0 relative">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {product.isNew && (
                      <Badge className="absolute top-3 right-3 bg-primary">
                        Новинка
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({Math.floor(Math.random() * 50 + 10)} отзывов)</span>
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Артикул:</span>
                      <span className="text-xs font-mono">{product.sku}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Package" size={14} className="text-muted-foreground" />
                      <span className="text-sm">
                        На складе: <span className={product.stock > 50 ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                          {product.stock} шт
                        </span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{product.price.toLocaleString('ru-RU')} ₽</p>
                      <p className="text-xs text-muted-foreground">за единицу</p>
                    </div>
                    <Button onClick={() => addToCart(product)} className="gap-2">
                      <Icon name="ShoppingCart" size={16} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="PackageOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}

            <Separator className="my-8" />

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} />
                Рекомендуемые товары
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{product.rating}</span>
                          </div>
                          <p className="text-lg font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            {cart.length === 0 ? (
              <Card className="text-center py-16">
                <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
                <Button onClick={() => setActiveTab('catalog')} className="gap-2">
                  <Icon name="Package" size={18} />
                  Перейти в каталог
                </Button>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                                <p className="text-xs text-muted-foreground">{item.sku}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Icon name="Trash2" size={18} />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="font-semibold w-12 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}</p>
                                <p className="text-lg font-bold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <h3 className="text-lg font-bold">Итого</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Товаров:</span>
                          <span className="font-medium">{cartCount} шт</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Сумма:</span>
                          <span className="font-medium">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="font-semibold">К оплате:</span>
                          <span className="text-2xl font-bold text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      </div>

                      {cartTotal < minOrderAmount && (
                        <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                          <div className="flex gap-2 items-start">
                            <Icon name="Info" size={18} className="text-orange-600 mt-0.5 flex-shrink-0" />
                            <div className="text-xs">
                              <p className="font-medium text-orange-900 mb-1">Минимальный заказ</p>
                              <p className="text-orange-700">
                                Добавьте товаров на {(minOrderAmount - cartTotal).toLocaleString('ru-RU')} ₽
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full gap-2" 
                        size="lg"
                        disabled={cartTotal < minOrderAmount}
                      >
                        <Icon name="Check" size={18} />
                        Оформить заказ
                      </Button>

                      <div className="pt-4 space-y-2">
                        <Button variant="outline" className="w-full gap-2" size="sm">
                          <Icon name="FileUp" size={16} />
                          Загрузить из Excel
                        </Button>
                        <Button variant="outline" className="w-full gap-2" size="sm">
                          <Icon name="Download" size={16} />
                          Скачать заказ
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="promo" className="space-y-6">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground">
                <h2 className="text-3xl font-bold mb-2">Специальное предложение</h2>
                <p className="text-primary-foreground/90">Акции и скидки для наших партнёров</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-primary">
                    <CardContent className="p-6">
                      <Badge className="mb-3">До 31 декабря</Badge>
                      <h3 className="text-xl font-bold mb-2">Скидка 15% на синтетику</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Специальная цена на всю линейку синтетических моторных масел MANNOL
                      </p>
                      <Button className="w-full">Подробнее</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">Новинка</Badge>
                      <h3 className="text-xl font-bold mb-2">Новая серия Premium</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Попробуйте новую линейку премиальных масел с расширенной гарантией
                      </p>
                      <Button variant="outline" className="w-full">Узнать больше</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Gift" size={40} className="mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Бонусная программа</h3>
                  <p className="text-sm text-muted-foreground">Накапливайте баллы за каждый заказ</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Truck" size={40} className="mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Бесплатная доставка</h3>
                  <p className="text-sm text-muted-foreground">При заказе от 50 000 ₽</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Award" size={40} className="mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Гарантия качества</h3>
                  <p className="text-sm text-muted-foreground">Сертифицированная продукция</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forum" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Форум партнёров
                </h2>
                <p className="text-muted-foreground">Обсуждения, вопросы и обмен опытом</p>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {[
                { title: 'Вопросы по новым продуктам', replies: 24, views: 156, author: 'Александр М.', time: '2 часа назад' },
                { title: 'Оптимальные условия хранения', replies: 18, views: 89, author: 'Ирина К.', time: '5 часов назад' },
                { title: 'Обсуждение поставок на январь', replies: 42, views: 234, author: 'Дмитрий П.', time: '1 день назад' }
              ].map((topic, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{topic.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="User" size={14} />
                            {topic.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {topic.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <Icon name="MessageCircle" size={18} className="mx-auto mb-1 text-primary" />
                          <span className="font-semibold">{topic.replies}</span>
                        </div>
                        <div className="text-center">
                          <Icon name="Eye" size={18} className="mx-auto mb-1 text-muted-foreground" />
                          <span className="font-semibold">{topic.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button className="w-full gap-2" size="lg">
              <Icon name="Plus" size={18} />
              Создать новую тему
            </Button>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
