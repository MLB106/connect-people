import { adminIPWhitelist } from '../../src/middlewares/admin/adminIP.middleware';
import { isIPAllowed } from '../../src/services/security.service';

jest.mock('../../src/services/security.service', () => ({
  isIPAllowed: jest.fn(),
}));

describe('adminIPWhitelist middleware', () => {
  let req: any;        // on utilise any pour éviter readonly
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
  req = {
    headers: {},
    socket: { remoteAddress: undefined }, // <-- ajoute cette ligne
    ip: undefined,
  } as any;
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  next = jest.fn();
});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('autorise une IP présente dans la whitelist', () => {
    (isIPAllowed as jest.Mock).mockReturnValue(true);
    req.ip = '203.0.113.42';

    adminIPWhitelist(req, res, next);

    expect(isIPAllowed).toHaveBeenCalledWith('203.0.113.42');
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('bloque une IP non autorisée via x-forwarded-for', () => {
    (isIPAllowed as jest.Mock).mockReturnValue(false);
    req.headers['x-forwarded-for'] = '198.51.100.17';

    adminIPWhitelist(req, res, next);

    expect(isIPAllowed).toHaveBeenCalledWith('198.51.100.17');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'IP non autorisée' });
    expect(next).not.toHaveBeenCalled();
  });

  test('renvoie 403 si aucune IP détectable', () => {
    (isIPAllowed as jest.Mock).mockReturnValue(false);

    adminIPWhitelist(req, res, next);

    expect(isIPAllowed).toHaveBeenCalledWith(undefined);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});